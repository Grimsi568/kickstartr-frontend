import React from "react"

type License = {
  id?: string
  key?: string
  issuedUtc?: string
  revokedUtc?: string | null
  template?: {
    id?: string
    name?: string
    description?: string | null
    slug?: string
  }
}

type Props = {
  licenses?: License[]
}

const LicenseList: React.FC<Props> = ({ licenses }) => (
  <div className="card p-6">
    <h2 className="text-xl font-bold mb-4">Licenses</h2>
    {!licenses || licenses.length === 0 ? (
      <div className="text-neutral-400">No licenses found.</div>
    ) : (
      <ul className="space-y-4">
        {licenses.map(lic => (
          <li key={lic.id} className="bg-cyan-900/10 border border-cyan-400 rounded-lg px-4 py-3 flex flex-col">
            <span className="font-bold text-cyan-400">{lic.template?.name || 'Unknown Template'}</span>
            {lic.template?.description && (
              <span className="text-xs text-neutral-400 mb-1">{lic.template.description}</span>
            )}
            <span className="text-xs text-neutral-400">License Key: <span className="font-mono">{lic.key}</span></span>
            <span className="text-xs text-neutral-400">Issued: {lic.issuedUtc ? new Date(lic.issuedUtc).toLocaleDateString() : '-'}</span>
            {lic.revokedUtc && (
              <span className="text-xs text-red-400">Revoked: {new Date(lic.revokedUtc).toLocaleDateString()}</span>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default LicenseList
