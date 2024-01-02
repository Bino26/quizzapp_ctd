import { BASE_URL } from 'config';
import { useState } from 'react';

const useDelete = (ids) => {
  const [isLoading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);
  const deleteNotes = async (ids) => {
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/notes?ids=${ids}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      setResponse({
        success: true,
        message: `Deleted`,
      });
    } catch (err) {
      setResponse({
        success: false,
        message: 'Something went wrong, please try again later!',
      });
    } finally {
      setLoading(false);
    }
  };
  return { isLoading, response, deleteNotes };
};

export default useDelete;
