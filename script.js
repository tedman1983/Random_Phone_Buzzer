async function startBuzzer() {
  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }

  const now = new Date();
  const startHour = 9;
  const endHour = 17;
  const buzzCount = 5;

  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, 0, 0).getTime();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, 0, 0).getTime();
  const duration = end - start;

  for (let i = 0; i < buzzCount; i++) {
    const delay = Math.random() * duration;
    setTimeout(() => {
      sendBuzzNotification("⏰ Time to pause and breathe!");
    }, delay);
  }

  alert(`Scheduled ${buzzCount} random buzzes between ${startHour}:00 and ${endHour}:00`);
}

function testBuzz() {
  sendBuzzNotification("🔔 Test Buzz: Your vibration works!");
}

function sendBuzzNotification(message) {
  navigator.serviceWorker.ready.then(reg => {
    reg.showNotification(message, {
      body: "This is a test or scheduled buzz.",
      vibrate: [200, 100, 200],
    });
  });
}
