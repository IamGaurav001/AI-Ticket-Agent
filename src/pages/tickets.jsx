import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTickets = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ title: "", description: "" });
        document.getElementById("create_ticket_modal").close();
        fetchTickets(); // Refresh list
      } else {
        alert(data.message || "Ticket creation failed");
      }
    } catch (err) {
      alert("Error creating ticket");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-base-content">Support Tickets</h1>
            <p className="text-base-content/70 mt-1">Manage and track your support requests</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("create_ticket_modal").showModal()}
          >
            + New Ticket
          </button>
        </div>

        {/* Create Ticket Modal */}
        <dialog id="create_ticket_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg mb-4">Create New Ticket</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Brief summary of the issue"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Detailed explanation..."
                  className="textarea textarea-bordered w-full h-32"
                  required
                ></textarea>
              </div>
              <div className="modal-action">
                <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : "Submit Ticket"}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Tickets Grid */}
        {tickets.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-box">
            <h3 className="text-xl font-semibold opacity-70">No tickets found</h3>
            <p className="opacity-50 mt-2">Create a new ticket to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/tickets/${ticket._id}`}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 group"
              >
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div className={`badge ${ticket.status === 'DONE' ? 'badge-success' : ticket.status === 'IN_PROGRESS' ? 'badge-warning' : 'badge-info'} badge-outline mb-2`}>
                      {ticket.status || 'OPEN'}
                    </div>
                    <span className="text-xs text-base-content/50">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="card-title text-lg group-hover:text-primary transition-colors">
                    {ticket.title}
                  </h2>
                  <p className="text-base-content/70 line-clamp-3 text-sm">
                    {ticket.description}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <span className="text-xs font-medium text-primary flex items-center gap-1">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}