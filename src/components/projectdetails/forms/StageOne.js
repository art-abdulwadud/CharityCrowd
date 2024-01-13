import React, { useEffect } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { toastAtom, userAtom } from '../../layout';
import ReactQueryPreloader from '../../ReactQueryPreloader';
import { sendQuery } from '../../globalFuncs';

const StageOne = ({ inputs, setInputs, switchSlide, activeSlide, stageOneRef, projectId }) => {
  const [toast] = useAtom(toastAtom);
  const [user] = useAtom(userAtom);
  const { isLoading, data, error, isError } = useQuery(['fetchUserDetails'], async () => {
    const myQuery = `
     query GetUserProfile($userid: String!) {
       getUserProfile(userid: $userid) {
        subscriptions
        anonymous
        payment {
          cardNumber
          nameOnCard
          expiryDate
          cvv
        }
       }
     }
    `;
    const results = await sendQuery(myQuery, { userid: user.id });
    if (results.data?.getUserProfile) {
      results.data?.getUserProfile?.payment?.cardNumber ? results.data.getUserProfile.payment.cardNumber = results.data?.getUserProfile?.payment.cardNumber.toString() : null;
      const subscribed = results.data?.getUserProfile?.subscriptions && results.data?.getUserProfile?.subscriptions.length > 0 ? results.data?.getUserProfile?.subscriptions[0][0] === projectId : false;
      setInputs({ ...inputs, subscribed: subscribed, anonymous: !!results.data?.getUserProfile?.anonymous, payment: { ...results.data?.getUserProfile?.payment } });
      return results.data.getUserProfile;
    }
    throw new Error(results.errors[0].message);
  }, { enabled: !!user.id });
  useEffect(() => {
    activeSlide === 1 ? stageOneRef.current?.classList.add('add-left') : null;
  }, [stageOneRef]);
  if (isLoading || isError || data.message) {
    return (<ReactQueryPreloader isError={isError} isLoading={isLoading} error={error} heightAuto />);
  }
  const handleClick = () => !inputs.amountToDonate || (inputs.amountToDonate && inputs.amountToDonate < 1) ? toast.current.show({ severity: 'error', summary: 'Missing required info', detail: 'Please enter how much you would like to donate', life: 6000 }) : switchSlide();
  return (
    <div className="surface-section py-3">
      <div className="flex flex-column md:align-items-center md:justify-content-between md:flex-row">
        <div className="font-medium text-3xl text-pink-500">Your donation</div>
        <div className="mt-3 md:mt-0" />
      </div>
      <div className="px-1 py-3">
        <div className="flex column w-100">
          <p htmlFor="currency-us" className="pb-1 text-lg mt-3 font-medium">Subscription</p>
          <div className="field-radiobutton">
            <RadioButton inputId="pay-once-radio" name="subscription" onChange={() => setInputs({ ...inputs, subscribed: false })} checked={!inputs.subscribed} />
            <label htmlFor="pay-once-radio">Pay once</label>
          </div>
          <div className="field-radiobutton">
            <RadioButton inputId="monthly-payment-radio" name="subscription" onChange={() => setInputs({ ...inputs, subscribed: true })} checked={inputs.subscribed} />
            <label htmlFor="monthly-payment-radio">Monthly payment</label>
          </div>
        </div>
        <div className="flex column w-100 mt-2">
          <label htmlFor="currency-us" className="pb-1 text-lg font-medium">How much would you like to donate?</label>
          <InputNumber inputId="currency-us" value={inputs.amountToDonate || null} onValueChange={(ev) => setInputs({ ...inputs, amountToDonate: ev.value })} mode="currency" currency="USD" locale="en-US" />
        </div>
        <div className="flex column w-100">
          <p htmlFor="currency-us" className="pb-1 text-lg mt-3 font-medium">Would you like your donation to be anonymous?</p>
          <div className="field-radiobutton">
            <RadioButton inputId="not-anonymous-radio" name="anonymous" onChange={() => setInputs({ ...inputs, anonymous: false })} checked={!inputs.anonymous} />
            <label htmlFor="not-anonymous-radio">No</label>
          </div>
          <div className="field-radiobutton">
            <RadioButton inputId="anonymous-radio" name="anonymous" onChange={() => setInputs({ ...inputs, anonymous: true })} checked={inputs.anonymous} />
            <label htmlFor="anonymous-radio">Yes</label>
          </div>
        </div>
        <div className="flex w-100">
          <Button label="Proceed" iconPos="right" icon="pi pi-angle-right" className="p-button-outlined bg-pink-500 border-pink-500 text-white mt-2" style={{ flex: '1' }} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default StageOne;
