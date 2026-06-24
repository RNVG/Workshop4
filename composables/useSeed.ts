import { collection, getDocs, limit, query, writeBatch, doc } from 'firebase/firestore'
import { useFirebase } from '~/composables/useFirebase'
import { ref } from 'vue'

const seeding = ref(false)
const seedMessage = ref('')

export function useSeed() {
  const { firestore } = useFirebase()

  const isCollectionEmpty = async (name: string) => {
    if (!firestore) return true
    const colRef = collection(firestore, name)
    const q = query(colRef, limit(1))
    const snapshot = await getDocs(q)
    return snapshot.empty
  }

  const seedDatabase = async () => {
    if (!firestore || seeding.value) return
    seeding.value = true
    seedMessage.value = 'Verificando colecciones...'

    try {
      // Mock Users
      const mockUsers = [
        { uid: 'user_1', name: 'Leanne Graham', email: 'Sincere@april.biz', photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
        { uid: 'user_2', name: 'Ervin Howell', email: 'Shanna@melissa.tv', photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
        { uid: 'user_3', name: 'Clementine Bauch', email: 'Nathan@yesenia.net', photoURL: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150' }
      ]

      // Mock Posts
      const mockPosts = [
        { id: 'post_1', userId: 'user_1', title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto' },
        { id: 'post_2', userId: 'user_1', title: 'qui est esse', body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla' },
        { id: 'post_3', userId: 'user_2', title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut', body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut' },
        { id: 'post_4', userId: 'user_2', title: 'eum et est occaecati', body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit' },
        { id: 'post_5', userId: 'user_3', title: 'nesciunt quas odio', body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque' }
      ]

      // Mock Comments
      const mockComments = [
        { id: 'comment_1', postId: 'post_1', name: 'id labore ex et quam laborum', body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium' },
        { id: 'comment_2', postId: 'post_1', name: 'quo vero reiciendis velit similique earum', body: 'est natus enim nihil est dolore omnis avoluptas assumenda\naestique expedita quas enim ipsam\nut architecto provident quas ut' },
        { id: 'comment_3', postId: 'post_2', name: 'odio adipisci rerum aut animi', body: 'quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione' },
        { id: 'comment_4', postId: 'post_3', name: 'alias odio sit', body: 'non et expedita molestiae sint sed\nsoluta temporibus porro a\nest qui qui omnis a qui ut\nerrores dolores animi quis' }
      ]

      // Mock Albums
      const mockAlbums = [
        { id: 'album_1', userId: 'user_1', title: 'quidem molestiae enim' },
        { id: 'album_2', userId: 'user_2', title: 'sunt qui ipsam debitis sequi' },
        { id: 'album_3', userId: 'user_3', title: 'omnis laborum odio' }
      ]

      // Mock Photos
      const mockPhotos = [
        { id: 'photo_1', albumId: 'album_1', title: 'accusamus beatae ad facilis cum similique qui sunt', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600' },
        { id: 'photo_2', albumId: 'album_1', title: 'reprehenderit est deserunt velit ipsam', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600' },
        { id: 'photo_3', albumId: 'album_2', title: 'officia porro iure quia iusto qui ipsa ut modi', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600' },
        { id: 'photo_4', albumId: 'album_3', title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600' }
      ]

      // Mock Todos
      const mockTodos = [
        { id: 'todo_1', userId: 'user_1', title: 'delectus aut autem', completed: false },
        { id: 'todo_2', userId: 'user_1', title: 'quis ut nam facilis et officia qui', completed: true },
        { id: 'todo_3', userId: 'user_2', title: 'fugiat veniam minus', completed: false },
        { id: 'todo_4', userId: 'user_2', title: 'et porro tempora', completed: true },
        { id: 'todo_5', userId: 'user_3', title: 'laboriosam mollitia et enim quasi adipisci quia provident illum', completed: false }
      ]

      // Seed Users if empty
      if (await isCollectionEmpty('users')) {
        seedMessage.value = 'Sembrando usuarios...'
        const batch = writeBatch(firestore)
        mockUsers.forEach((user) => {
          const userRef = doc(firestore, 'users', user.uid)
          batch.set(userRef, user)
        })
        await batch.commit()
      }

      // Seed Posts if empty
      if (await isCollectionEmpty('posts')) {
        seedMessage.value = 'Sembrando posts...'
        const batch = writeBatch(firestore)
        mockPosts.forEach((post) => {
          const postRef = doc(firestore, 'posts', post.id)
          batch.set(postRef, {
            userId: post.userId,
            title: post.title,
            body: post.body,
            createdAt: new Date()
          })
        })
        await batch.commit()
      }

      // Seed Comments if empty
      if (await isCollectionEmpty('comments')) {
        seedMessage.value = 'Sembrando comentarios...'
        const batch = writeBatch(firestore)
        mockComments.forEach((comment) => {
          const commentRef = doc(firestore, 'comments', comment.id)
          batch.set(commentRef, {
            postId: comment.postId,
            name: comment.name,
            body: comment.body,
            createdAt: new Date()
          })
        })
        await batch.commit()
      }

      // Seed Albums if empty
      if (await isCollectionEmpty('albums')) {
        seedMessage.value = 'Sembrando álbumes...'
        const batch = writeBatch(firestore)
        mockAlbums.forEach((album) => {
          const albumRef = doc(firestore, 'albums', album.id)
          batch.set(albumRef, {
            userId: album.userId,
            title: album.title,
            createdAt: new Date()
          })
        })
        await batch.commit()
      }

      // Seed Photos if empty
      if (await isCollectionEmpty('photos')) {
        seedMessage.value = 'Sembrando fotos...'
        const batch = writeBatch(firestore)
        mockPhotos.forEach((photo) => {
          const photoRef = doc(firestore, 'photos', photo.id)
          batch.set(photoRef, {
            albumId: photo.albumId,
            title: photo.title,
            url: photo.url,
            createdAt: new Date()
          })
        })
        await batch.commit()
      }

      // Seed Todos if empty
      if (await isCollectionEmpty('todos')) {
        seedMessage.value = 'Sembrando tareas (todos)...'
        const batch = writeBatch(firestore)
        mockTodos.forEach((todo) => {
          const todoRef = doc(firestore, 'todos', todo.id)
          batch.set(todoRef, {
            userId: todo.userId,
            title: todo.title,
            completed: todo.completed,
            createdAt: new Date()
          })
        })
        await batch.commit()
      }

      seedMessage.value = 'Sembrado completado con éxito.'
    } catch (err: any) {
      console.error('Error al sembrar base de datos:', err)
      seedMessage.value = `Error al sembrar: ${err.message || err}`
    } finally {
      seeding.value = false
    }
  }

  return {
    seeding,
    seedMessage,
    seedDatabase
  }
}
