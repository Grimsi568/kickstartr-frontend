import React, { useState } from 'react'
import { Api } from '@/lib/api'

const PostCommentForm: React.FC<{ templateId: string }> = ({ templateId }) => {
  const [text, setText] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await Api.postTemplateComment(templateId, {
        comment: text,
        isForDeveloper: !isPublic,
      })
      setText('')
      setIsPublic(true)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError('Failed to post comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-lg border border-cyan-400/40 rounded-2xl p-6 shadow-lg flex flex-col gap-4"
    >
      <textarea
        className="w-full rounded-lg bg-cyan-950/40 border border-cyan-400/30 text-cyan-100 font-mono p-3 resize-none focus:outline-none focus:border-cyan-300 transition"
        rows={4}
        placeholder="Write your comment here..."
        value={text}
        onChange={e => setText(e.target.value)}
        required
        disabled={submitting}
      />
      <label className="flex items-center gap-2 text-cyan-200 font-mono text-sm">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={e => setIsPublic(e.target.checked)}
          className="accent-cyan-400"
          disabled={submitting}
        />
        Display to everyone (uncheck for developer-only)
      </label>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary bg-cyan-400/80 border-cyan-400 text-white font-mono px-6 py-2 rounded-lg hover:bg-cyan-500/90 hover:border-cyan-300 transition-all disabled:opacity-60"
          disabled={submitting || !text.trim()}
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
        {success && <span className="text-cyan-300 font-mono text-sm">Comment posted!</span>}
        {error && <span className="text-red-400 font-mono text-sm">{error}</span>}
      </div>
    </form>
  )
}

export default PostCommentForm
