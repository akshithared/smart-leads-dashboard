import { useEffect, useState } from "react"

import toast from "react-hot-toast"

import { CSVLink } from "react-csv"

import API from "../services/api"

import LeadForm from "../components/LeadForm"

import LeadFilters from "../components/LeadFilters"

import LeadTable from "../components/LeadTable"



interface Lead {
  _id: string
  name: string
  email: string
  status: string
  source: string
  createdAt: string
}



const Dashboard = () => {

  const [leads, setLeads] = useState<
    Lead[]
  >([])

  const [loading, setLoading] =
    useState(false)

  const [search, setSearch] =
    useState("")

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("")

  const [status, setStatus] =
    useState("")

  const [source, setSource] =
    useState("")

  const [sort, setSort] =
    useState("latest")

  const [page, setPage] =
    useState(1)

  const [darkMode, setDarkMode] =
    useState(false)

  const role =
    localStorage.getItem("role")

  const [
    editingLeadId,
    setEditingLeadId,
  ] = useState<string | null>(null)

  const [
    selectedLead,
    setSelectedLead,
  ] = useState<Lead | null>(null)

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      status: "New",
      source: "Website",
    })



  // DEBOUNCED SEARCH
  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search)

    }, 500)

    return () =>
      clearTimeout(timer)

  }, [search])



  // FETCH LEADS
  const fetchLeads = async () => {

    try {

      setLoading(true)

      const { data } =
        await API.get(
          `/leads?page=${page}&search=${debouncedSearch}&status=${status}&source=${source}&sort=${sort}`
        )

      setLeads(data.leads)

      setLoading(false)

    } catch (error) {

      setLoading(false)

      toast.error(
        "Failed to fetch leads"
      )
    }
  }



  useEffect(() => {

    fetchLeads()

  }, [
    page,
    debouncedSearch,
    status,
    source,
    sort,
  ])



  // CREATE OR UPDATE LEAD
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

        toast.success(
          "Lead updated"
        )

      } else {

        await API.post(
          "/leads",
          formData
        )

        toast.success(
          "Lead created"
        )
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

      toast.error(
        "Operation failed"
      )
    }
  }



  // EDIT LEAD
  const handleEdit = (
    lead: Lead
  ) => {

    setEditingLeadId(
      lead._id
    )

    setFormData({
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
    })
  }



  // DELETE LEAD
  const handleDelete = async (
    id: string
  ) => {

    try {

      await API.delete(
        `/leads/${id}`
      )

      toast.success(
        "Lead deleted"
      )

      fetchLeads()

    } catch (error) {

      toast.error(
        "Delete failed"
      )
    }
  }



  return (

    <div
      className={`min-h-screen p-6 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

        <h1 className="text-4xl font-bold">
          Smart Leads Dashboard
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            {darkMode
              ? "Light Mode"
              : "Dark Mode"}
          </button>

          <CSVLink
            data={leads}
            filename="leads.csv"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export CSV
          </CSVLink>

        </div>

      </div>



      {/* LEAD FORM */}
      <LeadForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editingLeadId={
          editingLeadId
        }
      />



      {/* FILTERS */}
      <LeadFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
        sort={sort}
        setSort={setSort}
      />



      {/* LOADING */}
      {loading && (
        <p className="mb-4">
          Loading leads...
        </p>
      )}



      {/* EMPTY STATE */}
      {!loading &&
        leads.length === 0 && (
          <div className="bg-red-100 text-red-700 p-5 rounded">
            No leads found
          </div>
        )}



      {/* TABLE */}
      {!loading &&
        leads.length > 0 && (
          <LeadTable
            leads={leads}
            handleEdit={
              handleEdit
            }
            handleDelete={
              handleDelete
            }
            setSelectedLead={
              setSelectedLead
            }
            role={role}
          />
        )}



      {/* VIEW LEAD DETAILS */}
      {selectedLead && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white text-black p-6 rounded-xl w-[350px]">

            <h2 className="text-2xl font-bold mb-4">
              Lead Details
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {selectedLead.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedLead.email}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {
                selectedLead.status
              }
            </p>

            <p>
              <strong>Source:</strong>{" "}
              {
                selectedLead.source
              }
            </p>

            <button
              onClick={() =>
                setSelectedLead(
                  null
                )
              }
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}



      {/* PAGINATION */}
      <div className="flex gap-4 mt-6">

        <button
          onClick={() =>
            setPage(page - 1)
          }
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded text-black"
        >
          Prev
        </button>

        <button
          onClick={() =>
            setPage(page + 1)
          }
          className="bg-gray-300 px-4 py-2 rounded text-black"
        >
          Next
        </button>

      </div>

    </div>
  )
}

export default Dashboard