export function upload(body) {
  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body
  };
}

export function post(body) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}

export function del(body) {
  return {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}
