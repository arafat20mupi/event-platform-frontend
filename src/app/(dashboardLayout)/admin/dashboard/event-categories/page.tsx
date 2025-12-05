import EventCategoriesClient from "@/src/components/modules/eventsCetegory/EventCategoriesClient";
import { fetchEventCategories } from "@/src/services/events/eventsCetegory";
import { EventCategory } from "@/src/types/event";

const EventCategoriesPage = async () => {


    // Fetch categories from backend or pass as props
    const categories: EventCategory[] = await fetchEventCategories();
    return (
        <div className="p-6">
            <h1>Event Categories</h1>
            <EventCategoriesClient categories={categories} />
        </div>
    );
};

export default EventCategoriesPage;
