"use client"

import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import ProtectedRoute from "@/components/ProtectedRoute"

interface User {
  id: string;
  fullName: string;
  email: string;
  approved: boolean;
  createdAt?: any;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as User))
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleApprove = async (id: string) => {
    try {
      const userRef = doc(db, 'users', id)
      await updateDoc(userRef, { approved: true })
      fetchUsers()
    } catch (error) {
      console.error("Error approving user:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const userRef = doc(db, 'users', id)
      await deleteDoc(userRef)
      fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm">Total Users</p>
            <p className="text-2xl font-semibold">{users.length}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm">Approved</p>
            <p className="text-2xl font-semibold">
              {users.filter(user => user.approved).length}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm border-b border-gray-700">
                <th className="p-2">ID</th>
                <th className="p-2">Full Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Approved</th>
                <th className="p-2">Created At</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-700 text-sm">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.fullName}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${user.approved ? 'bg-green-600' : 'bg-red-600'}`}>
                      {user.approved ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="p-2">{user.createdAt?.toDate?.().toLocaleString()}</td>
                  <td className="p-2 space-x-2">
                    {!user.approved && (
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  )
}
