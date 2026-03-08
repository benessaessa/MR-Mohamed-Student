import React from 'react';
import Navbar from './Navbar';

const Notifications = () => {
  const notifications = [
    { id: 1, title: 'رسالة جديدة من المعلم', message: 'تم إضافة درس جديد في كورس الرياضيات', date: '10 مارس 2025', read: false },
    { id: 2, title: 'تم إضافة درس جديد', message: 'تم إضافة درس جديد في كورس الفيزياء', date: '9 مارس 2025', read: true },
    { id: 3, title: 'تذكير بدفع المحفظة', message: 'يرجى شحن المحفظة لاستكمال كورساتك', date: '8 مارس 2025', read: true },
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4" style={{ paddingTop: '6rem' }}>
        <h2 className="mb-4">الإشعارات</h2>
        <div className="list-group">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`list-group-item ${!notification.read ? 'bg-light' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex w-100 justify-content-between align-items-start">
                <h5 className="mb-1">
                  {!notification.read && <span className="badge bg-danger me-2">جديد</span>}
                  {notification.title}
                </h5>
                <small className="text-muted">{notification.date}</small>
              </div>
              <p className="mb-1">{notification.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;

