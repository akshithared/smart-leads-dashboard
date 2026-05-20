import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CSVLink } from "react-csv"

import API from "../services/api"

interface Lead {
  _id: string
  name: string
  email: string
  status: string
  source: string
}

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] =
    useState("")

  const [status, setStatus] = useState("")
  const [source, setSource] = useState("")
  const [page, setPage] = useState(1)

  const role = localStorage.getItem("role")

  const [editingLeadId, setEditingLeadId] =
    useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const fetchLeads = async () => {
    try {
      setLoading(true)

      const { data } = await API.get(
        `/leads?page=${page}&search=${debouncedSearch}&status=${status}&source=${source}&sort=latest`
      )

      setLeads(data.leads)

      setLoading(false)
    } catch (error) {
      setLoading(false)

      toast.error("Failed to fetch leads")
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [page, debouncedSearch, status, source])

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      if (editingLeadId) {
        await API.put(
          `/leads/${editingLeadId}`,
          formData
        )

        toast.success("Lead updated")
      } else {
        await API.post(
          "/leads",
          formData
        )

        toast.success("Lead created")
      }

      setFormData({
        name: "",
        email: "",
        status: "New",
        source: "Website",
      })

      setEditingLeadId(null)

      fetchLeads()
    } catch (error) {
      toast.error("Operation failed")
    }
  }

  const handleEdit = (lead: Lead) => {
    setEditingLeadId(lead._id)

    setFormData({
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
    })
  }

  const handleDelete = async (
    id: string
  ) => {
    try {
      await API.delete(`/leads/${id}`)

      toast.success("Lead deleted")

      fetchLeads()
    } catch (error) {
      toast.error("Delete failed")
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold">
          Smart Leads Dashboard
        </h1>

        <CSVLink
          data={leads}
          filename="leads.csv"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </CSVLink>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-4 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Name"
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
          placeholder="Email"
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
            : "Add Lead"}
        </button>
      </form>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name/email"
          className="border p-3 rounded"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border p-3 rounded"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

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
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
        >
          <option value="">
            All Sources
          </option>

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
          onClick={fetchLeads}
          className="bg-black text-white rounded"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="mb-4">
          Loading leads...
        </p>
      )}

      {!loading && leads.length === 0 && (
        <div className="bg-gray-100 p-6 rounded text-center">
          No leads found
        </div>
      )}

      {leads.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">
                  Name
                </th>

                <th className="p-3">
                  Email
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Source
                </th>

                <th className="p-3">
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
                  <td className="p-3">
                    {lead.name}
                  </td>

                  <td className="p-3">
                    {lead.email}
                  </td>

                  <td className="p-3">
                    {lead.status}
                  </td>

                  <td className="p-3">
                    {lead.source}
                  </td>

                  <td className="p-3 flex gap-2">
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
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={() =>
            setPage(page - 1)
          }
          disabled={page === 1}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Prev
        </button>

        <button
          onClick={() =>
            setPage(page + 1)
          }
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Dashboard