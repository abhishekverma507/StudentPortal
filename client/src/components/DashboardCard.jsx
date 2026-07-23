function DashboardCard({ title, value, icon }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">

      <div className="card dashboard-card h-100">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h6 className="text-muted">{title}</h6>

              <h2 className="fw-bold">{value}</h2>

            </div>

            <div className="icon-box">
              <i className={icon}></i>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;