import { Fragment, useContext } from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { addHours } from "date-fns";

const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;
  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 30 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item
          data-cy="activities-filter-all"
          color={"blue"}
          name={"all"}
          content={"All Activities"}
          active={predicate.size === 0}
          onClick={() => {
            setPredicate("all", "true");
          }}
        />
        <Menu.Item
          data-cy="activities-filter-imgoing"
          color={"blue"}
          name={"username"}
          content={"I'm Going"}
          active={predicate.has("isGoing")}
          onClick={() => {
            setPredicate("isGoing", "true");
          }}
        />
        <Menu.Item
          data-cy="activities-filter-ishost"
          color={"blue"}
          name={"host"}
          content={"I'm hosting"}
          active={predicate.has("isHost")}
          onClick={() => {
            setPredicate("isHost", "true");
          }}
        />
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Select Date"}
      />
      <Calendar
        onChange={(date) => setPredicate("startDate", addHours(date!, 23))}
        value={predicate.get("startDate") || new Date()}
      />
    </Fragment>
  );
};

export default observer(ActivityFilters);
