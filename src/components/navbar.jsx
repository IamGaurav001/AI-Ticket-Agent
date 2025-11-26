import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold text-primary tracking-tight">
            Ticket<span className="text-base-content">AI</span>
          </Link>
        </div>
        <div className="flex gap-3">
          {!token ? (
            <>
              <Link to="/signup" className="btn btn-ghost btn-sm">
                Signup
              </Link>
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium">{user?.email}</span>
                <span className="text-xs text-base-content/50 capitalize">{user?.role || 'User'}</span>
              </div>
              
              {user && user?.role === "admin" && (
                <Link to="/admin" className="btn btn-ghost btn-sm">
                  Admin Panel
                </Link>
              )}
              
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>{user?.email?.[0]?.toUpperCase()}</span>
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><button onClick={logout}>Logout</button></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}