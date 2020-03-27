const login_form = document.querySelector('#login_form')
const reg_form = document.querySelector('#registration_form')

function renderData(doc) {
    // create an element
    let item = document.createElement('div')
    
    let output  // variable where the document objects will be assigned

    let data = doc.data()   // calls the document

    Object.entries(data).forEach(([key, value]) => {    // assigns key value pair for each document
        output += key + ' - ' + value + '<br />'
    })
    
    // add attribute and assign document id for reach item
    item.setAttribute('data-id', doc.id)

    // append content 
    item.innerHTML = output
}

db.collection('accounts').get().then( snapshot => { // makes a promise
    snapshot.docs.forEach( doc => {
        // console.log(doc)
        renderData(doc)
    })
})

// registration
reg_form.addEventListener('submit', e => {
    e.preventDefault()

    // get all account collection
    db.collection('accounts').where('email', '==', reg_form.email.value).get().then(snapshot => {
        
        // check if email exists
        if (snapshot.size === 0) {
            db.collection('accounts').add({
                first_name: reg_form.first_name.value,
                last_name: reg_form.last_name.value,
                email: reg_form.email.value,
                password: reg_form.password.value,
                accountStatus: 1,
                accountType: 1
            })

            // show success message
        } 
        else {
            // show error
        }
    })
})


// login

login_form.addEventListener('submit', e => {
    e.preventDefault()

    db.collection('accounts').where('email', '==', login_form.email.value).get().then(snapshot => {
        e.preventDefault()

        if (snapshot.size === 1) {

            // verify credentials
            snapshot.docs.map(doc => {
                if (login_form.password.value === doc.data().password) {
                    console.log('login verified')
                }
                else {
                    console.log('invalid credentials')
                }
            })
            
        }
        else {
            // show error
            console.log('there is no account associate with your email address')
        }
    })
})

