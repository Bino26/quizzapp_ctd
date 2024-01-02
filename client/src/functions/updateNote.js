import { BASE_URL } from 'config';
import { useState } from 'react';

const useUpdate = (id, newNote) => {
  const [isLoadingEdit, setLoadingEdit] = useState(false);

  const [responseEdit, setResponseEdit] = useState(null);
  const updateNote = async (id, newNote) => {
    setLoadingEdit(true);
    try {
      await fetch(`${BASE_URL}/note/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newNote),
      });

      setResponseEdit({
        success: true,
        message: `The note is edited`,
      });
    } catch (err) {
      setResponseEdit({
        success: false,
        message: 'Something went wrong, please try again later!',
      });
    } finally {
      setLoadingEdit(false);
    }
  };
  return { isLoadingEdit, responseEdit, updateNote };
};

export default useUpdate;
