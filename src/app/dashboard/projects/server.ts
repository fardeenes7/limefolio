'use server';

import { auth } from '@/auth';

export async function getProjects() {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }
    const res = await fetch(process.env.API_BASE_URL + 'projects/', {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });
    return res.json();
  } catch (e) {
    return null;
  }
}

export async function getProject(id: string) {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }
    const res = await fetch(process.env.API_BASE_URL + `projects/${id}/`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });
    return res.json();
  } catch (e) {
    return null;
  }
}

export async function createProject(data: any) {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }
    console.log(session);
    const res = await fetch(process.env.API_BASE_URL + 'projects/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...data, user: session.user.id })
    });
    const resData = await res.json();
    console.log(resData);
    return resData;
  } catch (e) {
    return null;
  }
}

export async function updateProject(data: any, id: string) {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }
    const res = await fetch(process.env.API_BASE_URL + `projects/${id}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  } catch (e) {
    return null;
  }
}

export async function addProjectImage(data: any) {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }
    const res = await fetch(process.env.API_BASE_URL + `projects/media/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`
      },
      body: data
    });
    return res.json();
  } catch (e) {
    return null;
  }
}
