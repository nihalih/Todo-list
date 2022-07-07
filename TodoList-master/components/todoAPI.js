const API_URL = 'http://127.0.0.1:4000'

const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}'

const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

const TASKLIST = 
  'query taskLists($username: String!){taskLists(where: { owner: { username: $username } }){id title}}'

const CREATE_TASK_LIST =
  'mutation($title:String!,$username:String!){createTaskLists(input: { title: $title owner:{ connect: { where: { username: $username } } } } ){ taskLists{id title}}}'

const DELETE_TASK_LIST=
  'mutation($id:ID!){deleteTaskLists(where:{id: $id }){nodesDeleted}}'

const TASK = 
  'query tasks($id: ID!){tasks(where: { belongsTo: { id: $id} }) {id content done}}'
const CREATE_TASK =
  'mutation($id:ID!,$content: String!){ createTasks(input:{ content: $content belongsTo : { connect: { where: { id: $id } } }  }) { tasks {id content done }}}'
const DELETE_TASK = 
  'mutation($id:ID!){deleteTasks(where:{id: $id}){nodesDeleted }}'
const DELETE_ALL_TASK_BY_ID =
  'mutation($id: ID!){ deleteTasks(where:{ belongsTo: { id: $id}}) {nodesDeleted }}'

const UPDATE_TASK =
  'mutation($id:ID!,$done:Boolean!){updateTasks(where:{id:$id} update:{done:$done}){tasks{id content done}}}'

const MAKE_ALL_TASK=
  'mutation($id:ID!){ updateTasks(where:{belongsTo:{id:$id}} update:{done:true }){tasks{id content done}}}'
const DEMAKE_ALL_TASK=
  'mutation($id:ID!){ updateTasks(where:{belongsTo:{id:$id}} update:{done:false }){tasks{id content done}}}'

const SHOW_DONE_TASK =
  'query tasks($id:ID!){tasks (where: { done:true belongsTo:{id:$id}} ) {id content done }}'

const SHOW_NOTDONE_TASK =
  'query tasks($id:ID!){tasks (where: { done:false belongsTo:{id:$id}} ) {id content done }}'

const SHOW_ROLE =
  'query users($username:String!){users(where:{username:$username}){roles}}'

const SHOW_USERS =
  'query {users(where:{roles_NOT_INCLUDES:"admin"} options: { sort: [{ username: ASC }] }){id username roles }}'
const DELETE_USER = 
  'mutation($id:ID!) { deleteUsers(where: { id: $id }){ nodesDeleted }}'

const DELETE_ALLTASKLIST_USER =
'mutation($id:ID!){ deleteTaskLists(where: { owner:{id :$id} }) { nodesDeleted}}'

const DELETE_ALL_TASK_BY_USERID =
  'mutation($id: ID!){ deleteTasks(where:{ belongsTo: { owner :{id: $id}}}) {nodesDeleted }}'
  
export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

export function signUp (username, password) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: SIGN_UP,
        variables: {
          username: username,
          password: password
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.signUp
      })
      .catch(error => {
        throw error
      })
  }
  export function taskLists (username,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: TASKLIST,
        variables: {
          username: username
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.taskLists
      })
      .catch(error => {
        throw error
      })
  }
  export function createTaskLists (title,username,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: CREATE_TASK_LIST,
        variables: {
          title: title,
          username: username
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }

        return jsonResponse.data.createTaskLists.taskLists
      })
      .catch(error => {
        throw error
      })
  }

  export function deleteTaskLists (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: DELETE_TASK_LIST,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.deleteTaskLists.nodesDeleted
      })
      .catch(error => {
        throw error
      })
  }

  export function afficheTasks (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: TASK,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.tasks
      })
      .catch(error => {
        throw error
      })
  }

  export function createTask (id,content,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: CREATE_TASK,
        variables: {
          id: id,
          content: content
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }

        return jsonResponse.data.createTasks.tasks
      })
      .catch(error => {
        throw error
      })
  }

  export function deleteTask (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: DELETE_TASK,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.deleteTasks.nodesDeleted
      })
      .catch(error => {
        throw error
      })
  }
  //Supprime toute les taches etant ratacher à l'id parent
  export function deleteAllTask (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: DELETE_ALL_TASK_BY_ID,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.deleteTasks.nodesDeleted
      })
      .catch(error => {
        throw error
      })
  }

  export function UpdateTask (id,done,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':"Bearer "+ token
      },
      body: JSON.stringify({
        query: UPDATE_TASK,
        variables: {
          id: id,
          done: done
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.updateTasks.tasks
      })
      .catch(error => {
        throw error
      })
  }
  export function MakeAllTask (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: MAKE_ALL_TASK,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.updateTasks.tasks
      })
      .catch(error => {
        throw error
      })
  }
  export function DemakeAllTask (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: DEMAKE_ALL_TASK,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.updateTasks.tasks
      })
      .catch(error => {
        throw error
      })
  }

  export function ShowDoneTask (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: SHOW_DONE_TASK,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.tasks
      })
      .catch(error => {
        throw error
      })
  }

  export function ShowNotDoneTask (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: SHOW_NOTDONE_TASK,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.tasks
      })
      .catch(error => {
        throw error
      })
  }

  
  export function ShowRoles (username,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: SHOW_ROLE,
        variables: {
          username: username
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.users[0].roles[0]
      })
      .catch(error => {
        throw error
      })
  }

  export function ShowUser (token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: SHOW_USERS,
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.users
      })
      .catch(error => {
        throw error
      })
  }

  export function DeleteUser (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: DELETE_USER,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.deleteUsers.nodesDeleted
      })
      .catch(error => {
        throw error
      })
  }


  export function deleteAllTasksUser (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: DELETE_ALLTASKLIST_USER,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.deleteTaskLists.nodesDeleted
      })
      .catch(error => {
        throw error
      })
  }


  export function deleteAllTaskUser (id,token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        query: DELETE_ALL_TASK_BY_USERID,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.deleteTasks.nodesDeleted
      })
      .catch(error => {
        throw error
      })
  }
  

