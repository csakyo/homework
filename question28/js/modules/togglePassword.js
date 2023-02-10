export const togglePassword = (e) => {
  if (e.target.nextElementSibling.type === 'password') {
    e.target.nextElementSibling.type = 'text';
    e.target.textContent = '非表示';
    e.target.setAttribute('aria-label', 'パスワードを非表示にします');
  } else {
    e.target.nextElementSibling.type = 'password';
    e.target.textContent = '表示';
    e.target.setAttribute('aria-label', 'パスワードを表示にします');
  }
}
