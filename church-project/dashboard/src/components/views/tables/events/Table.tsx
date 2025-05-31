import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModernTable from "@components/ui/Table/Index";
import type { Column, ActionButton } from "@components/ui/Table/Index";
import type { ChurchEvent } from "@/components/interface/ChurchEvent";
import EventModal from "@/components/views/model/events/Index";
import Pagination from "@/components/ui/Pagination/Index";


export default function EventTable() {
  const { t } = useTranslation();
 const [events, setEvents] = useState<ChurchEvent[]>([
   {
     id: "1",
     image:
       "https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=",
     title: "Sunday Worship",
     event_date: "2025-06-01",
     event_time: "10:00 AM",
     location: "Grace Church Hall",
     churchName: "Holy Trinity Chapel",
     description: "A powerful Sunday gathering.",
     upcoming: false,
     status: "Active",
     latitude: 28.6139,
     longitude: 77.209,
   },
   {
     id: "2",
     image:
       "https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=",
     title: "Youth Rally",
     event_date: "2025-06-15",
     event_time: "5:00 PM",
     location: "Hope Church Ground",
     churchName: "Grace Community Church",
     description: "A night of music, faith, and fun.",
     upcoming: true,
     status: "Inactive",
     latitude: 19.076,
     longitude: 72.8777,
   },
 ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);

  const handleEdit = (event: ChurchEvent) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };




  const columns: Column<ChurchEvent>[] = [
    {
      key: "image",
      label: "Image",
      render: (event) => (
        <img
          src={event.image}
          alt={event.title}
          style={{
            width: 80,
            height: 50,
            borderRadius: 4,
            objectFit: "cover",
          }}
        />
      ),
    },
    { key: "title", label: t("translate.title") },
    { key: "event_date", label: t("translate.date") },
    { key: "event_time", label: t("translate.time") },
    { key: "location", label: t("translate.location") },
    { key: "churchName", label: t("translate.churchName") },
    { key: "description", label: t("translate.description") },
    {
      key: "status",
      label: "Status",
      render: (event) => (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 15,
            backgroundColor:
              event.status === "Active" ? "var(--positive)" : "var(--negative)",
            color: "var(--primarywhite)",
            fontWeight: 600,
            fontSize: "12px",
            userSelect: "none",
          }}
        >
          {t(`translate.${event.status}`)}
        </span>
      ),
    },
  ];

  const actions: ActionButton<ChurchEvent>[] = [
    {
      type: "update",
      onClick: handleEdit,
    },
    {
      type: "delete",
      onClick: (event) =>
        setEvents((prev) => prev.filter((e) => e.id !== event.id)),
    },
    {
      type: "toggle",
      onClick: (event) =>
        setEvents((prev) =>
          prev.map((e) =>
            e.id === event.id
              ? {
                  ...e,
                  status: e.status === "Active" ? "Inactive" : "Active",
                }
              : e
          )
        ),
    },
  ];

      const handlePageChange = ()=>{

  }

  return (
    <div>
      <ModernTable
        columns={columns}
        data={events}
        actions={actions}
        keyField="id"
      />
                  <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange}/>
      
      <EventModal open={openModal} close={handleClose} data={selectedEvent}/>
    </div>
  );
}
