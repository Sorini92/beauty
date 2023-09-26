import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function HistoryList() {

	const {allAppointments, getAppointments} = useContext(AppointmentContext);

	useEffect(() => {
		getAppointments()
	}, []);

	const elements = allAppointments.map((item) => {
		return (
			<AppointmentItem 
				{...item}
				key={item.id}
			/>
		)
	})

	return (
		<>
			{elements}
		</>
	);
}

export default HistoryList;
