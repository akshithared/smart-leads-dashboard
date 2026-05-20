interface Lead {
  _id: string
  name: string
  email: string
  status: string
  source: string
  createdAt: string
}

interface Props {
  leads: Lead[]

  handleEdit: (
    lead: Lead
  ) => void

  handleDelete: (
    id: string
  ) => void

  setSelectedLead: React.Dispatch<
    React.SetStateAction<Lead | null>
  >

  role: string | null
}

const LeadTable = ({
  leads,
  handleEdit,
  handleDelete,
  setSelectedLead,
  role,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-4">
              Name
            </th>

            <th className="p-4">
              Email
            </th>

            <th className="p-4">
              Status
            </th>

            <th className="p-4">
              Source
            </th>

            <th className="p-4">
              Created
            </th>

            <th className="p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-b"
            >
              <td className="p-4">
                {lead.name}
              </td>

              <td className="p-4">
                {lead.email}
              </td>

              <td className="p-4">
                {lead.status}
              </td>

              <td className="p-4">
                {lead.source}
              </td>

              <td className="p-4">
                {new Date(
                  lead.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4 flex gap-2">
                <button
                  onClick={() =>
                    setSelectedLead(
                      lead
                    )
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    handleEdit(lead)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                {role === "admin" && (
                  <button
                    onClick={() =>
                      handleDelete(
                        lead._id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadTable