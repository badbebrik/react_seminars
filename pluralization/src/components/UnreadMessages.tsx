import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const UnreadMessages = () => {
  const {t} = useTranslation();

  const [messageCount, setMessageCount] = useState(0);
  const currentDate = new Date();

  useEffect(() => {
    const randomCount = Math.floor(Math.random() * 10) + 1;
    setMessageCount(randomCount);
  }, []);

  return (
    <div>
      {t('unreadMessages', { count: messageCount })}
      <span style={{ marginLeft: '10px'}}>
        ({t('intlDateTime', {
          val: currentDate,
          formatParams: {
            val: {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            }
          }
        })})
      </span>
    </div>
  );
}; 