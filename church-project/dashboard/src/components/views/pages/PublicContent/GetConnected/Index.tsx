import Grid from "@/components/ui/Grid/Index";
import SearchInput from "@/components/ui/SearchInput/Index";
import GetConnectedTable from "@/components/views/tables/getConnected/Table";
import { useState } from "react";
import { MdOutlineConnectWithoutContact } from "react-icons/md";

const GetConnectedPage = ()=>{
      const [searchTerm, setSearchTerm] = useState("");
    return (
        <>
          <div className="mb-6">
        <div className="flex items-center gap-2 mb-4" style={{color:"var(--secondary_black)"}}>
          <MdOutlineConnectWithoutContact className="text-2xl text-primary" />
          <h2 className="text-xl " style={{fontFamily:"var( --font-marcellus)", fontWeight:"600"}}>Get Connected</h2>
        </div>

        <Grid gap="md">
          <Grid.Row className="items-center">
            <Grid.Column span={{ base: 12, md: 6 }}>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search users..."
              />
            </Grid.Column>
        
          </Grid.Row>
        </Grid>
      </div>
        <GetConnectedTable/>
        </>
    )
}

export default GetConnectedPage