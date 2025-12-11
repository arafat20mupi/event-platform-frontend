import { CreateEventForm } from "@/src/components/modules/events/create-event-form";
import { fetchEventCategories } from "@/src/services/events/eventsCetegory";

const page = async () => {
    const categories = await fetchEventCategories()
    return (
        <div>
            <CreateEventForm 
            categories={categories}
            
             />
        </div>
    );
};

export default page;