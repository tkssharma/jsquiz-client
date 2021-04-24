import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

import Result from "../../components/Result";
import { query } from "../../graphql";

export default () => {

    const { data } = useQuery(query.GET_QUESTIONS);

    return <Result data={data} />;
};
