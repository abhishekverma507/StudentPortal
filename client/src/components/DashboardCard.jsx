function DashboardCard({ title, value, icon }) {
  return (
    <div className="col-md-3 mb-4">

      <div className="card dashboard-card">

        <div className="card-body">

          <div className="d-flex justify-content-between">

            <div>

              <h6>{title}</h6>

              <h2>{value}</h2>

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