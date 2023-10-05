import Calendar from "../../components/calendar/Calendar";
import HistoryList from "../../components/historyList/HistoryList";
import useAuth from "../../hooks/useAuth";
import "./historyPage.scss";

function HistoryPage() {
    const { isAuth } = useAuth();

    if (!isAuth) return null;

    return (
        <section className="history">
            <div className="history__controls">
                <Calendar />
            </div>
            <div className="history__list">
                <HistoryList />
            </div>
        </section>
    );
}

export default HistoryPage;
