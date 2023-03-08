// @ts-nocheck
import { useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import { useRouter } from 'next/router'
import { useCertificate } from "src/@core/hooks/form/useCertificate";

// registerMyQuestion();

export default function TestCreator(props: { json: any; }) {
  const router = useRouter();
  const { id } = router.query || null || '';

  let [creator, setCreator] = useState<any>();


  const { updateCertificateTest, store: {certificate_test} } = useCertificate(null);


    if (creator === undefined) {
      let options = { showLogicTab: false, showTranslationTab: false, haveCommercialLicense: true, showJSONEditorTab: false };
      creator = new SurveyCreator(options);
      creator.saveSurveyFunc = (no: any, callback: any) => {
        callback(no, true);
        if (!certificate_test?._id) return;
        const jsonUp = JSON.stringify(creator.JSON);
        updateCertificateTest( certificate_test?._id, {survey: jsonUp} )
      };
      setCreator(creator);
    }

  
  creator.JSON = props.json;


  return (
    <div style={{ height: "calc(100% - 70px)" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}
