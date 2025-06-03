import { useEffect } from 'react';
import { unreadNotifications } from '../API/dashboardApi';

export default function useNotificationChecker() {

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const {data} = await unreadNotifications()
        if (data.unreadCount > 0 && 'serviceWorker' in navigator) {    
             const registration = await navigator.serviceWorker.ready;
             
                registration.showNotification("Unread messages", {
                body: `You have ${data.unreadCount} unread messages`,
                icon: '/logo.png',
                vibrate: [100, 50, 100],
                tag:"unread-messages"
                });
          
          


        }
      } catch (error) {
        console.error('Notification check failed', error);
      }
    };
 checkNotifications() 
    return () => checkNotifications()
  }, []);


  useEffect(() => {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    });
  }
}, []);

}
