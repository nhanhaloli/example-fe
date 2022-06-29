const mainEndpoint = 'http://localhost:3000'

export async function login(user: any): Promise<any> {
  const data = await fetch(`${mainEndpoint}/auth/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(data => data.json())
    .catch(err => err)
  
  return data
}