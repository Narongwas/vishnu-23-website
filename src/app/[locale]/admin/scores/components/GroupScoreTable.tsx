import ListItem from "@/app/[locale]/admin/features-management/components/ListItem";
import ScoreSpin from "@/app/[locale]/admin/scores/components/ScoreSpin";
import { StyleableFC } from "@/lib/types/misc";

type GroupData = {
  group: string;
  place: number;
};

type GroupScoreTableProps = {
  data: GroupData[];
};

const GroupScoreTable: StyleableFC<GroupScoreTableProps> = ({ data }) => {
  return (
    <div className="type-body-large relative z-10 overflow-x-auto text-left">
      <ListItem className="type-title-medium bg-yellow relative grid-cols-[45px_35px_90px_150px] border-black sm:grid-cols-4">
        <div className="absolute inset-0 bg-[url('/decorating/texture/fabric.png')] opacity-50 mix-blend-soft-light" />
        <div>อันดับ</div>
        <div>กรุ๊ป</div>
        <div>ก๊ก</div>
        <div>คะแนน</div>
      </ListItem>
      {data.map(({ group, place }) => (
        <ListItem
          key={group}
          className="type-body-medium grid-cols-[40px_35px_90px_1fr] sm:grid-cols-4"
        >
          <div>{place}</div>
          <div>{group}</div>
          <div>กะเตี๋ยวเรือ</div>
          <div className="w-full">
            <ScoreSpin />
          </div>
        </ListItem>
      ))}
    </div>
  );
};

export default GroupScoreTable;
