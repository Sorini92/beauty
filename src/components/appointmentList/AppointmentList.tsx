import { useContext, useEffect } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

function AppointmentList() {

	const {activeAppointments, getActiveAppointments, appointmentLoadingStatus} = useContext(AppointmentContext);

	useEffect(() => {
		getActiveAppointments()
	}, []);

	const elements = activeAppointments.map((item) => {
		return (
			<AppointmentItem 
				{...item}
				key={item.id}
			/>
		)
	})

	if (appointmentLoadingStatus === 'loading') {
		return <Spinner/>;
	} else if (appointmentLoadingStatus === 'error') {
		return (
			<>
				<Error/>
				<button 
					onClick={getActiveAppointments} 
					className="schedule__reload"
				>
					Try to reload
				</button>
			</>
		)
	}

	return (
		<>
			{elements}
		</>
	);
}

export default AppointmentList;
