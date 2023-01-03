const usernameEl = document.querySelector('#username');//declaration des inputs
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#cpassword');

const form = document.querySelector('#signup');


const checkUsername = () => {

    let valid = false;

    const min = 3,//le caractere minimal du nom egal  ou moins 3
        max = 25;//25 est le nombre de caractere maximum pour le nom 

    const username = usernameEl.value.trim();// La méthode  trim()supprime les espaces blancs des deux côtés d’une chaîne

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');//le nom ne peut pas etre vide
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {//verification de l'email
    let valid = false;
    const email = emailEl.value.trim();//La méthode  trim()supprime les espaces blancs des deux côtés d’une chaîne
    if (!isRequired(email)) {//l'email doit etre obligatoire sinon un erreur s'affiche
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {//l'email doit etre valide sinon un erreur s'affiche 
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {//si le mot des passe n'est pas valid ,une  erreur s'affiche,
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {//sinon le mot de passe de securite est different du mot de passe
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);// sinon le mot de passe est  valide
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
  //  Vérifier et Confirmer le mot de passe
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {//verfication de la validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");//neccecité d'un pattern specific
    
  
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;//if le variable obligatoire egal à value on retourne vrai
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    //Obtenir l’élément form-field
    const formField = input.parentElement;
    //Ajouter la classe d’erreur
    formField.querySelector('small').setAttribute('class','text-danger');
    //formField.classList.ajouter('error');

    // regarder l'erreur en message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    //Obtenir l’élément form-field
    const formField = input.parentElement;

    // supprimer la classe erreur
    formField.querySelector('small').setAttribute('class','text-success');
 //   formField.classList.add('success');

//    Masquer le message d’erreur
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
   //empecher l'envoi du formulaire
    e.preventDefault();

  //valider les champs
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&//la validite du form necessite la validité d'un de ces inputs
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    // if le fomulaire est valid
    if (isFormValid) {

    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
       // Annuler le minuteur précédent
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
form.addEventListener('input', debounce(function (e) {//on fait un switch 
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));