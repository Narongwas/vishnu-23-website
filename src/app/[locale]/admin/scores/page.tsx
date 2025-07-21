import GroupScoreTable from "@/app/[locale]/admin/scores/components/GroupScoreTable";
import SubPageHeader from "@/components/SubPageHeader";

export default function ScorePage() {
  return (
    <div className="relative">
      <SubPageHeader curvedText="Manage" title="Scores" />
      <div className="mx-auto -mt-16 h-full px-4">
        <GroupScoreTable />
      </div>
    </div>
  );
}
