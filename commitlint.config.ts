import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-length": [RuleConfigSeverity.Error, "always", 80],
    "subject-max-length": [RuleConfigSeverity.Error, "always", 50],
  },
};

export default Configuration;
