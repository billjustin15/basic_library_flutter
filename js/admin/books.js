const add_book_form = document.querySelector('#add_book_form')
const user_list = document.querySelector('#user_list')
const book_list = document.querySelector('#book_list')
const rent_list = document.querySelector('#rent_list')
const content = document.querySelector('#content')
const header = document.querySelector('#header')


// add_book_form.addEventListener('submit', e => {
//     e.preventDefault()

//     db.collection('books').add({
//         title: add_book_form.title.value,
//         author: add_book_form.author.value,
//         description: add_book_form.description.value,
//         status: 'available'
//     }).then(() => {
//         console.log('Book was added succesfully!');

//         add_book_form.title.value = ''
//         add_book_form.author.value = ''
//         add_book_form.description.value = ''
//     })
// })

user_list.addEventListener('click', () => {
    let toAppend = ''
    let thead = `
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Password</th>
            <th class="collapsing">Status</th>
            <th>Action</th>
        `
    
    header.innerHTML = thead
    
    db.collection('accounts').orderBy('last_name').get().then(snapshot => {
        snapshot.docs.map(doc => {
            let data = `<tr data-id="${ doc.id }"><td>${ doc.data().first_name }</td><td>${ doc.data().last_name }</td><td>${ doc.data().email }</td><td>${ doc.data().password }</td><td>${ doc.data().accountStatus }</td><td class="collapsing"><a>Activate</a> | <a>Deactivate</a></td></tr>`

            toAppend += data
        })
        content.innerHTML = toAppend
    })
})

book_list.addEventListener('click', () => {
    let toAppend = ''
    let thead = `
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Book ID</th>
            <th class="collapsing">Status</th>
            <th>Action</th>
        `
    header.innerHTML = thead

    db.collection('books').get().then(snapshot => {
        snapshot.docs.map(doc => {
            let data = `<tr data-id="${ doc.id }"><td>${ doc.data().title }</td><td>${ doc.data().author }</td><td>${ doc.data().description }</td><td>${ doc.id }</td><td>${ doc.data().status }</td><td class="collapsing"><a>Activate</a> | <a>Deactivate</a></td></tr>`

            toAppend += data
        })
        content.innerHTML = toAppend
    })

    
})