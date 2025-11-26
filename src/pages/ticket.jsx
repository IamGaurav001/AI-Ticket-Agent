import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/navbar";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setTicket(data.ticket);
        } else {
          alert(data.message || "Failed to fetch ticket");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, token]);

  if (loading)
    return (
      <>
        <Navbar />
        <div className="text-center mt-10">Loading ticket details...</div>
      </>
    );
  if (!ticket)
    return (
      <>
        <Navbar />
        <div className="text-center mt-10">Ticket not found</div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm mb-6 pl-0 hover:bg-transparent hover:text-primary">
          ← Back to Tickets
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-base-content mb-2">{ticket.title}</h1>
              <div className="flex items-center gap-3 text-sm text-base-content/60">
                <span>Created {new Date(ticket.createdAt).toLocaleString()}</span>
                <span>•</span>
                <span>ID: {ticket._id}</span>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg border border-base-200">
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-base-content/80 whitespace-pre-wrap leading-relaxed">
                  {ticket.description}
                </p>
              </div>
            </div>

            {ticket.helpfulNotes && (
              <div className="alert alert-info bg-info/10 border-info/20 text-base-content shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6 text-info"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div className="w-full">
                  <h3 className="font-bold text-info mb-1">AI Suggested Solution</h3>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Metadata */}
          <div className="space-y-6">
            <div className="card bg-base-200/50 shadow-sm border border-base-200">
              <div className="card-body p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-base-content/50 tracking-wider">Status</label>
                  <div className={`mt-1 badge ${ticket.status === 'DONE' ? 'badge-success' : ticket.status === 'IN_PROGRESS' ? 'badge-warning' : 'badge-info'} badge-lg w-full py-4`}>
                    {ticket.status || 'OPEN'}
                  </div>
                </div>

                {ticket.priority && (
                  <div>
                    <label className="text-xs font-bold uppercase text-base-content/50 tracking-wider">Priority</label>
                    <div className="mt-1 font-semibold">{ticket.priority}</div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold uppercase text-base-content/50 tracking-wider">Assigned To</label>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-8">
                        <span>{ticket.assignedTo?.email?.[0]?.toUpperCase() || "?"}</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium truncate">
                      {ticket.assignedTo?.email || "Unassigned"}
                    </span>
                  </div>
                </div>

                {ticket.relatedSkills?.length > 0 && (
                  <div>
                    <label className="text-xs font-bold uppercase text-base-content/50 tracking-wider">Related Skills</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {ticket.relatedSkills.map(skill => (
                        <div key={skill} className="badge badge-outline badge-sm">{skill}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}