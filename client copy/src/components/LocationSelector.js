import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LocationSelector = () => {
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
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex gap-4 items-center'>
                <select
                    className="form-select form-select-sm border py-2 rounded-md"
                    value={selectedCity}
                    onChange={handleCityChange}>
                    <option value="">Chọn tỉnh thành</option>
                    {cities.map((city) => (
                        <option key={city.Id} value={city.Id}>
                            {city.Name}
                        </option>
                    ))}
                </select>

                <select
                    className="form-select form-select-sm border py-2 rounded-md"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedCity}>
                    <option value="">Chọn quận huyện</option>
                    {districts.map((district) => (
                        <option key={district.Id} value={district.Id}>
                            {district.Name}
                        </option>
                    ))}
                </select>

                <select
                    className="form-select form-select-sm border py-2 rounded-md"
                    value={selectedWard}
                    onChange={handleWardChange}
                    disabled={!selectedDistrict}>
                    <option value="">Chọn phường xã</option>
                    {wards.map((ward) => (
                        <option
                            key={ward.Id}
                            value={ward.Id}>
                            {ward.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col gap-1'>
                <label
                    htmlFor='exactly-address'
                    className='font-medium'>
                    Exactly address
                </label>
                <input
                    type='text'
                    readOnly
                    className='border border-gray-300 rounded-md p-2 w-full bg-[#e9ecef] outline-none'
                    value={`${selectedWard ? `${wards?.find(item => item.Id === selectedWard)?.Name},` : ''} ${selectedDistrict ? `${districts?.find(item => item.Id === selectedDistrict)?.Name},` : ''} ${selectedCity ? `${cities?.find(item => item.Id === selectedCity)?.Name}` : ''}`} />
            </div>
        </div>
    )
}

export default LocationSelector