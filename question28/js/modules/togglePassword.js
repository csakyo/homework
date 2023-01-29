export const togglePassword = (target) => {
  if (target.nextElementSibling.type === 'password') {
    target.nextElementSibling.type = 'text';
    target.textContent = '非表示';
    target.setAttribute('aria-label', 'パスワードを非表示にします');
  } else {
    target.nextElementSibling.type = 'password';
    target.textContent = '表示';
    target.setAttribute('aria-label', 'パスワードを表示にします');
  }
}
