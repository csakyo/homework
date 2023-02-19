const url = new URL(window.location.href);
const params = url.searchParams;

if(params.get('token') !== localStorage.getItem('takenForSetNewPassword')) window.location.href = '../notautherize.html';
