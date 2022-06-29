const mainEndpoint = 'http://localhost:8080'

const headers = {
  'Content-Type': 'application/json',
  // 'Authorization': `Bearer ${localStorage.getItem('auth')}`
}

export async function getAllBooks(query: any): Promise<any> {
  const res = await fetch(`${mainEndpoint}/book?limit=${query.limit}&current=${query.current}`, {
    headers
  })
  const data = await res.json()
  
  return data
}

export function create(payload: any) {
  return fetch(`${mainEndpoint}/book`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  })
}

export function update(payload: any, id: string) {
  return fetch(`${mainEndpoint}/book/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload)
  })
}

export function getDetailValue(id: string) {
  return fetch(`${mainEndpoint}/book/${id}`, { headers }).then(data => data.json())
}

export function updateStatus(id: string) {
  return fetch(`${mainEndpoint}/book/${id}`, {
    method: 'PATCH',
    headers
  })
}

export function deleteBook(id: string) {
  return fetch(`${mainEndpoint}/book/${id}`, {
    method: 'DELETE',
    headers
  })
}