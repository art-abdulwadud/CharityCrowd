/* eslint-disable max-statements */
/* eslint-disable multiline-comment-style */
export const sendQuery = async (query, variables = null) => {
  // https://charitycrowd.onrender.com/graphql
  // http://localhost:7000/graphql
  const request = await fetch('https://charitycrowd.onrender.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ query, variables: { ...variables } })
  });
  const response = await request.json();
  console.log(response.errors);
  if (response.errors) throw response.errors;
  return response;
};

export const copyToClipboard = (textToCopy, toast) => {
  try {
    navigator?.clipboard.writeText(textToCopy)
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Copied to Clipboard', detail: '', life: 3000 });
      })
      .catch((error) => toast.current.show({ severity: 'error', summary: 'Failed to copy', detail: `Contact admin to fix error. ${error.message}`, life: 3000 }));
    if (!navigator.clipboard) {
      const tempText = document.createElement('textarea');
      tempText.value = textToCopy;
      tempText.classList.add('.d-none');
      document.body.appendChild(tempText);
      tempText.select();
      document.execCommand('copy');
      document.body.removeChild(tempText);
      toast.current.show({ severity: 'success', summary: 'Copied to Clipboard', detail: '', life: 3000 });
    }
  } catch (error) {
    console.log(error.message);
  }
};
