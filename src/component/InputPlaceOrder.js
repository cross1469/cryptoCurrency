const InputPlaceOrder = () => {
  return (
    <InputGroup>
      <Input placeholder="username" />
      <InputGroupAddon>
        <Input addon type="checkbox" />
      </InputGroupAddon>
      <Input placeholder="Check it out" />
      <InputGroupButton>Send</InputGroupButton>
    </InputGroup>
  );
};

export default InputPlaceOrder;
