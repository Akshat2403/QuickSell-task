import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";
import { apiUrl } from "./apiUrl";
import { loadTicketGrid, mapUsersById } from "./utils";
import { Ticket, User } from "./interfaces";
import Loader from "./components/Loader";
import "./global.css";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userData, setUserData] = useState<Record<string, User>>({});
  const [gridData, setGridData] = useState<Record<string, Ticket[]>>({});
  const [grouping, setGrouping] = useState<string>("status");
  const [ordering, setOrdering] = useState<string>("priority");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((res) => {
        const { tickets, users } = res;
        setTickets(tickets);
        console.log(tickets);
        setUserData(mapUsersById(users));
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (!tickets.length) return;
    setGridData(loadTicketGrid(tickets, grouping, ordering));
    setLoading(false);
  }, [grouping, ordering, tickets]);

  const onSetGrouping = useCallback((value: string) => {
    setLoading(true);
    setGrouping(value);
    saveSettings({ grouping: value });
  }, []);

  const onSetOrdering = useCallback((value: string) => {
    setLoading(true);
    setOrdering(value);
    saveSettings({ ordering: value });
  }, []);

  const saveSettings = useCallback((data: Record<string, string>) => {
    for (let key in data) localStorage.setItem(key, data[key]);
  }, []);

  const loadSettings = useCallback(() => {
    setGrouping(localStorage.getItem("grouping") || "status");
    setOrdering(localStorage.getItem("ordering") || "priority");
  }, []);

  return (
    <div className="App">
      <Header
        grouping={grouping}
        setGrouping={onSetGrouping}
        ordering={ordering}
        setOrdering={onSetOrdering}
      />
      {loading ? (
        <Loader />
      ) : (
        <Grid gridData={gridData} grouping={grouping} userIdToData={userData} />
      )}
    </div>
  );
}

export default App;
