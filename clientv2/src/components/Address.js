import React, { useEffect, useState } from 'react'
import Select from './Select'
import axios from 'axios'
import LocationSelector from './LocationSelector'

const Address = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
                );
                setCities(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleCityChange = (e) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);
        setDistricts([]);
        setWards([]);
        setSelectedDistrict('');
        setSelectedWard('');
        const selectedCityData = cities.find((city) => city.Id === cityId);
        if (selectedCityData) {
            setDistricts(selectedCityData?.Districts);
        }
        console.log(cities)
    };
    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        setWards([]);
        setSelectedWard('');
        const selectedCityData = cities.find((city) => city.Id === selectedCity);
        if (selectedCityData) {
            const selectedDistrictData = selectedCityData.Districts.find(
                (district) => district.Id === districtId
            );
            if (selectedDistrictData) {
                setWards(selectedDistrictData?.Wards);
            }
        }
    };
    const handleWardChange = (e) => {
        setSelectedWard(e.target.value)
    }
    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${selectedWard ? `${wards?.find(item => item.Id === selectedWard)?.Name}, ` : ''}${selectedDistrict ? `${districts?.find(item => item.Id === selectedDistrict)?.Name}, ` : ''}${selectedCity ? `${cities?.find(item => item.Id === selectedCity)?.Name}` : ''}`,
            province: `${selectedCity ? `${cities?.find(item => item.Id === selectedCity)?.Name}` : ''}`
        }))
    }, [selectedWard, selectedDistrict, selectedCity])
    console.log(payload)
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-semibold pb-4'>Address for rent</h2>
            <div className='flex gap-2'>
                <div className='w-full flex items-center justify-between gap-2'>
                    {/* <LocationSelector
                        payload={payload}
                        setPayload={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields} /> */}
                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={selectedCity}
                        onChange={handleCityChange}
                        label={'Tỉnh/Thành phố'}
                        setValue={cities}
                    />

                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        label={'Quận/Huyện'}
                        setValue={districts}
                    />

                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        value={selectedWard}
                        onChange={handleWardChange}
                        label={'Phường/Xã'}
                        setValue={wards}
                    />
                </div>
            </div>
        </div>
    )
}

export default Address