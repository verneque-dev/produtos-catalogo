const notyf = new Notyf({
	duration: 3000,
	ripple: true
})

async function login() {
	try {
		const dados = {
			username: document.getElementById("username").value,
			password: document.getElementById("password").value
		}
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dados)
		})

		const res = await response.json()

		if (!response.ok) return notyf.error(res.erro)

		const token = res.token

		saveTokenInCookie(token)

		notyf.success("Login bem-sucedido!")
		reloadPag()
	}
	catch (error) {
		notyf.error("Erro ao tentar logar.")
		console.error(error)
	}
}

async function getProdutos(query) {
	try {
		let response
		if (query) {
			response = await fetch(`/produtos?name=${query}`)
		}
		else {
			response = await fetch("/produtos")
		}

		if (!response.ok) return null
		const produtos = await response.json()

		return produtos
	}
	catch (error) {
		notyf.error("Erro ao buscar produtos")
		console.error(error)
	}
}

async function exibirProdutos(query) {
	startLoading()

	document.querySelector(".mensagem").style.display = "none"

	const produtosDiv = document.querySelector(".produtos")
	produtosDiv.innerHTML = ""

	let produtos
	if (query) {
		produtos = await getProdutos(query)
	}
	else {
		produtos = await getProdutos()
	}
	if (!produtos) {
		stopLoading()
		document.querySelector(".mensagem").style.display = "flex"

		return null
	}

	produtos.forEach((produto) => {
		const id = produto.tb_produtos_id
		const name = produto.tb_produtos_nome
		const desc = produto.tb_produtos_desc
		const price = produto.tb_produtos_valor

		const cardProduto = document.createElement("div")
		cardProduto.className = "card"
		cardProduto.innerHTML = `
				<h3 class="name-card">${name}</h3><br>
				<p class="desc-card">Descrição: ${desc}</p><br>
				<p>Preço: R$ ${price}</p><br>
				<div class="row row-adm">
					<button class="btn-edit" onclick="abrirModal(${id}, '${name}', '${desc}', '${price}')"> EDITAR </button>
					<button class="btn-del" onclick="deleteProduto(${produto.tb_produtos_id})"> DELETAR </button>
				</div>
			`
		produtosDiv.appendChild(cardProduto)
	});
	stopLoading()
	return produtos
}


async function deleteProduto(id) {
	try {
		const response = await fetch(`/produtos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${getTokenByCookie()}`
			}
		})
		const res = await response.json()

		if (!response.ok) {
			return notyf.error(res.erro)
		}
		reloadPag()
		notyf.success(res.message)
	}
	catch (error) {
		notyf.error("Erro ao tentar deletar o produto")
		console.error(error)
	}
}

async function updateProduto() {
	try {
		const id = document.getElementById("id").value
		const dadosAtualizados = {
			name: document.getElementById("name").value,
			description: document.getElementById("desc").value,
			value: document.getElementById("price").value
		}
		const response = await fetch(`/produtos/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${getTokenByCookie()}`
			},
			body: JSON.stringify(dadosAtualizados)
		})
		const res = await response.json()

		if (!response.ok) {
			return notyf.error(res.erro)
		}
		reloadPag()
		notyf.success(res.message)
	}
	catch (error) {
		notyf.error("Erro ao tentar atualizar o produto.")
		console.error(error)
	}
}

async function criarProduto() {
	try {

		const dadosProduto = {
			name: document.getElementById("nameCriar").value,
			description: document.getElementById("descCriar").value,
			value: document.getElementById("priceCriar").value
		}

		const response = await fetch("/produtos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${getTokenByCookie()}`
			},
			body: JSON.stringify(dadosProduto)
		})


		const res = await response.json()

		if (!response.ok) {
			return notyf.error(res.erro)
		}
		reloadPag()
		notyf.success(res.message)
	}
	catch (error) {
		notyf.error("Erro ao tentar criar o produto.")
		console.error(error)
	}
}

function searchProduto() {
	const divProdutos = document.querySelector(".produtos")
	const result = document.querySelector(".resultado")
	divProdutos.innerHTML = ""

	const query = document.getElementById("search").value

	exibirProdutos(query.trim()).then((produtos) => {
		accessRoutesPrivates()
		if (query.trim() === "") {
			result.style.display = "none"
			return
		}

		let string = `0 produtos encontrados`

		if (produtos?.length === 1) {
			string = `${produtos.length} produto encontrado...`
		}
		else if (produtos?.length > 1) {
			string = `${produtos.length} produtos encontrados...`
		}

		result.style.display = "block"
		result.innerHTML = `Exibindo resultados da busca "${query}": ${string}`
		document.querySelector(".mensagem").style.display = "none"
	})
}


function handleKeyPress(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		document.querySelector('.btn-search').click();
	}
}


function abrirModal(id, name, desc, price) {
	document.getElementById("name").value = name
	document.getElementById("desc").value = desc
	document.getElementById("price").value = price
	document.getElementById("id").value = id
	const modal = document.querySelector(".modal")

	document.body.classList.add("no-scroll")
	modal.style.display = "flex"
}

function abrirModalCriar() {
	const modal = document.querySelector(".modal-criar")

	document.body.classList.add("no-scroll")
	modal.style.display = "flex"
}

function abrirModalLogin() {
	const modal = document.querySelector(".modal-login")

	document.body.classList.add("no-scroll")
	modal.style.display = "flex"
}

function fecharModal() {
	const modal = document.querySelector(".modal")
	const modalCriar = document.querySelector(".modal-criar")
	const modalLogin = document.querySelector(".modal-login")

	document.body.classList.remove("no-scroll")
	modalCriar.style.display = "none"
	modalLogin.style.display = "none"
	modal.style.display = "none"
}

function startLoading() {
	document.querySelector(".loading").style.display = "flex"
}

function stopLoading() {
	document.querySelector(".loading").style.display = "none"
}

function saveTokenInCookie(token) {
	const dias = 30
	const segundos = dias * 24 * 60 * 60

	document.cookie = `token=${token}; max-age=${segundos}; path=/; Secure; SameSite=Strict`
}

function getTokenByCookie() {
	cookies = document.cookie.split("; ")
	for (const cookie of cookies) {
		if (cookie.split("=")[0] === "token") {
			return cookie.split("=")[1]
		}
	}
	return null
}

function accessRoutesPrivates() {
	const token = getTokenByCookie()
	if (!token) return

	document.querySelector(".adm").style.display = "inline-block"
	document.getElementById("btn-account").style.display = "none"
	document.getElementById("btn-logout").style.display = "inline-block"
	const buttons = document.querySelectorAll(".row-adm")
	buttons.forEach((button) => {
		button.style.display = "flex"
	})
}

function logout() {
	document.cookie = "token=; max-age=0; path=/;"
	reloadPag()

	document.getElementById("btn-logout").style.display = "none"
	document.getElementById("btn-account").style.display = "inline-block"
	document.querySelector(".adm").style.display = "none"
	const buttons = document.querySelectorAll(".row-adm")
	buttons.forEach((button) => {
		button.style.display = "none"
	})

	notyf.success("Logout bem-sucedido!")
}

function reloadPag() {
	const modais = document.querySelectorAll(".modal, .modal-criar, .modal-login");
	modais.forEach((modal) => {
		modal.style.display = "none";
	});
	document.body.classList.remove("no-scroll");

	document.querySelectorAll(".modal input, .modal-login input, .modal-criar input").forEach(input => input.value = "")

	exibirProdutos().then(() => accessRoutesPrivates())
}