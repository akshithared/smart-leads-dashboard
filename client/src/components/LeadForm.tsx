interface Props {
  formData: {
    name: string
    email: string
    status: string
    source: string
  }

  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string
      email: string
      status: string
      source: string
    }>
  >

  handleSubmit: (
    e: React.FormEvent
  ) => void

  editingLeadId: string | null
}

const LeadForm = ({
  formData,
  setFormData,
  handleSubmit,
  editingLeadId,
}: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-4 gap-4 mb-8 p-6 rounded-xl shadow bg-white"
    >
      <input
        type="text"
        placeholder="Lead Name"
        className="border p-3 rounded"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        required
      />

      <input
        type="email"
        placeholder="Lead Email"
        className="border p-3 rounded"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
        required
      />

      <select
        className="border p-3 rounded"
        value={formData.status}
        onChange={(e) =>
          setFormData({
            ...formData,
            status: e.target.value,
          })
        }
      >
        <option value="New">
          New
        </option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">
          Lost
        </option>
      </select>

      <select
        className="border p-3 rounded"
        value={formData.source}
        onChange={(e) =>
          setFormData({
            ...formData,
            source: e.target.value,
          })
        }
      >
        <option value="Website">
          Website
        </option>

        <option value="Instagram">
          Instagram
        </option>

        <option value="Referral">
          Referral
        </option>
      </select>

      <button
        type="submit"
        className="bg-black text-white py-3 rounded md:col-span-4"
      >
        {editingLeadId
          ? "Update Lead"
          : "Create Lead"}
      </button>
    </form>
  )
}

export default LeadForm