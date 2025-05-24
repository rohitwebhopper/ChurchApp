import Grid from "@/components/ui/Grid/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import PrayerRequestTable from "@/components/views/tables/prayerRequests/Table";
import { useState } from "react";
import { PiHandsPrayingBold } from "react-icons/pi";

const PrayerRequestPage = ()=>{

  const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
        <div className="mb-6">
        <div className="flex items-center gap-2 mb-4" style={{color:"var(--secondary_black)"}}>
          <PiHandsPrayingBold className="text-2xl text-primary" />
          <h2 className="text-xl" style={{fontFamily:"var( --font-marcellus)", fontWeight:"600"}}>Prayer Requests</h2>
        </div>

        <Grid gap="md">
          <Grid.Row className="items-center">
            <Grid.Column span={{ base: 12, md: 6 }}>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search request..."
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <PrayerRequestTable/>
        </>
    )
}

export default PrayerRequestPage