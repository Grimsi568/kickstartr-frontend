import React from "react"

type Props = {
  displayName?: string
  email?: string
  id?: string
  createdAt?: string
}

function getInitials(name?: string, email?: string, displayName?: string) {
  if (displayName && displayName.trim().length > 0) {
    return displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }
  if (name && name.trim().length > 0) {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }
  if (email) return email[0].toUpperCase()
  return "U"
}

const UserInfoCard: React.FC<Props> = ({ displayName, email, id, createdAt }) => (
  <div className="card p-8 mb-8 flex flex-col items-center bg-gradient-to-br from-cyan-900/40 to-cyan-800/10 border border-cyan-700 shadow-lg rounded-xl">
    <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-md">
      {getInitials(undefined, email, displayName)}
    </div>
    <h2 className="text-2xl font-bold mb-1 text-cyan-300">{displayName || email}</h2>
    <div className="text-neutral-400 mb-4">{email}</div>
    <div className="w-full flex flex-col gap-2 text-sm">
      <div className="flex justify-between">
        <span className="text-neutral-300">Joined:</span>
        <span className="font-mono text-neutral-300">{createdAt ? new Date(createdAt).toLocaleDateString() : '-'}</span>
      </div>
    </div>
  </div>
)

export default UserInfoCard
