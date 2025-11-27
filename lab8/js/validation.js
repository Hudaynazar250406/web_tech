// Функция для проверки состава ланча
function validateLunch(selected) {
  const { soup, main, starter, drink, dessert } = selected;
  
  if (!soup && !main && !starter && !drink && !dessert) {
    return {
      valid: false,
      message: "Ничего не выбрано. Выберите блюда для заказа"
    };
  }
  
  if (soup && main && starter && drink) {
    return { valid: true };
  }
  
  if (soup && main && drink) {
    return { valid: true };
  }
  
  if (soup && starter && drink) {
    return { valid: true };
  }
  
  if (main && starter && drink) {
    return { valid: true };
  }
  
  if (main && drink) {
    return { valid: true };
  }
  
  if (dessert && (soup || main || starter || drink)) {
    if (soup && main && starter && drink) return { valid: true };
    if (soup && main && drink) return { valid: true };
    if (soup && starter && drink) return { valid: true };
    if (main && starter && drink) return { valid: true };
    if (main && drink) return { valid: true };
  }
  
  if (drink && dessert && !main) {
    return {
      valid: false,
      message: "Выберите главное блюдо"
    };
  }
  
  if (soup && !main && !starter) {
    return {
      valid: false,
      message: "Выберите главное блюдо/салат/стартер"
    };
  }
  
  if (starter && !soup && !main) {
    return {
      valid: false,
      message: "Выберите суп или главное блюдо"
    };
  }
  
  if ((soup && main && starter) || 
      (soup && main) || 
      (soup && starter) || 
      (main && starter) || 
      main) {
    return {
      valid: false,
      message: "Выберите напиток"
    };
  }
  
  return {
    valid: false,
    message: "Выберите блюда согласно одному из доступных комбо"
  };
}

// Функция для показа уведомления
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="notification-content">
      <h3>Внимание</h3>
      <p>${message}</p>
      <button class="notification-ok">Окей</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  const okButton = notification.querySelector('.notification-ok');
  okButton.addEventListener('click', function() {
    notification.remove();
  });
  
  notification.addEventListener('click', function(e) {
    if (e.target === notification) {
      notification.remove();
    }
  });
}